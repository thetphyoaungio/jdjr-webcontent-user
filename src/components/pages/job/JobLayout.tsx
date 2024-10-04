"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";
import { useAtom } from "jotai";
import { panelWidthAtom } from "@/utils/atoms";
import MediaQuery from "react-responsive";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Sheet, SheetRef } from "react-modal-sheet";
import { Text } from "@/components/ui/typography";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { sheetOpen } from "./atoms";

interface JobLayout {
  categoriesList: React.ReactNode;
  jobsList: React.ReactNode;
}

const JobLayoutContainer: React.FC<JobLayout> = ({
  categoriesList,
  jobsList
}) => {
  const [enter, setEnter] = useState<boolean>(false);
  const [fullHeight, setFullHeight] = useState(600);

  const [, setPanelWidth] = useAtom(panelWidthAtom);
  const [isOpen, setOpen] = useAtom(sheetOpen);

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);

  const snapPoints = [fullHeight, 600, 400];
  const initialSnap = 0;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullHeight(window.innerHeight);
    }
  }, []);

  const handleResize = () => {
    setPanelWidth(containerRef?.current?.offsetWidth as number);
  };

  return (
    <MediaQuery minWidth={1024}>
      {(matches) =>
        matches ? (
          <div className="flex flex-col md:flex-row justify-start items-start">
            {categoriesList}
            {jobsList}
          </div>
        ) : (
          <>
            <div className="min-h-[calc(100vh-100px)]">{jobsList}</div>
            <Sheet
              rootId="root"
              ref={ref}
              isOpen={isOpen}
              onClose={() => setOpen(false)}
              snapPoints={snapPoints}
              initialSnap={initialSnap}
              // onSnap={(snapIndex) =>
              //   console.log("> Current snap point index:", snapIndex)
              // }
            >
              <Sheet.Container>
                <Sheet.Header>
                  <div className="bg-blue-400 h-[56px] flex justify-center items-center relative">
                    <Text className="text-white">Categories</Text>
                    <X
                      className="absolute right-4 text-yellow-200"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                </Sheet.Header>
                <Sheet.Content>{categoriesList}</Sheet.Content>
              </Sheet.Container>
            </Sheet>
          </>
        )
      }
    </MediaQuery>
  );
};

export default JobLayoutContainer;
