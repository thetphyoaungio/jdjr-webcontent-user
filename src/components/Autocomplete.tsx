"use client";
import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
  CommandEmpty
} from "./ui/command";
import { Command as CommandPrimitive } from "cmdk";
import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent,
  useTransition
} from "react";
import { Skeleton } from "./ui/skeleton";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export type Option = Record<"value" | "label", string> & Record<string, string>;

interface AutoCompleteProps {
  options: Option[];
  emptyMessage: string;
  value?: Option;
  onValueChange?: (value: Option) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  showCross?: boolean;
}

const AutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  disabled,
  isLoading = false,
  showCross
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const input = inputRef.current;

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(value as Option);
  const [inputValue, setInputValue] = useState<string>(value?.label || "");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!input) {
        return;
      }

      if (!isOpen) {
        setOpen(true);
      }

      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => option.label === input.value
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        } else {
          const tmp = pathname.split("/");
          if (!tmp[1].trim() || tmp[1] !== "jobs") {
            router.push(`/result-not-found`);
          } else {
            tmp[1] === "jobs" && router.push(`/${tmp[1]}/result-not-found`);
          }
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen, options, onValueChange]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    setInputValue(selected?.label);
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      setInputValue(selectedOption.label);

      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
      startTransition(() => {
        router.push(
          `/jobs/${selectedOption?.maincategoryslug}/${selectedOption?.subcategoryslug}/${selectedOption.value}`
        );
      });
    },
    [onValueChange, router]
  );

  const handleClearInput = () => {
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div className="relative">
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={isLoading ? undefined : setInputValue}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
        />
        {input?.value && input?.value?.length > 0 && showCross && (
          <div
            onClick={handleClearInput}
            className="absolute flex items-center top-0 bottom-0 right-2 cursor-pointer"
          >
            <Image
              src="/uploads/icons/cross.svg"
              width={24}
              height={24}
              alt="search"
            />
          </div>
        )}
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white outline-none",
            isOpen ? "block" : "hidden"
          )}
        >
          <CommandList className="rounded-xl border border-blue-150">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {options && options.length > 0 && !isLoading && (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected?.value === option.value;
                  const matchIndex = option.label
                    ?.toLowerCase()
                    .indexOf(inputValue?.toLowerCase());

                  let highlightedLabel;
                  if (matchIndex !== -1 && inputValue) {
                    const beforeMatch = option.label.slice(0, matchIndex);
                    const matchText = option.label.slice(
                      matchIndex,
                      matchIndex + inputValue.length
                    );
                    const afterMatch = option.label.slice(
                      matchIndex + inputValue.length
                    );

                    highlightedLabel = (
                      <>
                        {beforeMatch}
                        <span className="text-neutral-900">{matchText}</span>
                        {afterMatch}
                      </>
                    );
                  } else {
                    highlightedLabel = option.label;
                  }

                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        "w-full items-center text-neutral-300",
                        !isSelected ? "pl-8" : null
                      )}
                    >
                      {isSelected ? <Check className="w-4" /> : null}
                      {highlightedLabel}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
            {!isLoading ? (
              <CommandEmpty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                {emptyMessage}
              </CommandEmpty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};

export default AutoComplete;
