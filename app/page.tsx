'use client'
import { Select } from "@/components/Select";
import { Slider } from "@/components/Slider";
import { useSortingContext } from "@/components/Viz";
import { SortingType } from "@/lib/types";
import { algorithms, getAnimation } from "@/lib/utils";
import { CgPlayButtonO, CgPlayStopO } from "react-icons/cg";

export default function Home() {
  const { arrayToSort, isSorting, animationSpeed, setAnimationSpeed, selectedAlgorithm, setSelectedAlgorithm, resetRequired, resetArray, runAnimation }= useSortingContext()

  const handleSelect= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    setSelectedAlgorithm(e.target.value as SortingType)
  }
  const handlePlay= ()=>{
    if(resetRequired){
      resetArray()
      return
    }
    getAnimation(selectedAlgorithm, isSorting, arrayToSort, runAnimation)
  }

  return (
    <main className="mt-8">
      <div className="flex justify-center">
        <div id="contcont" className="flex max-w-[1020px] w-full flex-col lg:px-0 px-4">
          <div className="w-full h-[75vh] border-2 border-gray-600 rounded-lg relative">
            <div className="flex sm:flex-row flex-col border-b-2 border-gray-600 rounded-lg p-3 items-center justify-center gap-4">
              <Slider
                value={animationSpeed}
                handleChange={(e)=> setAnimationSpeed(Number(e.target.value))}
                disabled={isSorting}
              />
              <Select
                options={algorithms}
                defaultValue={selectedAlgorithm}
                onChange={handleSelect}
                disabled={isSorting}
              />
              <button className="flex items-center justify-end" onClick={handlePlay}>
                {resetRequired ? <CgPlayStopO className="h-8 w-8 text-white" /> : <CgPlayButtonO className="h-8 w-8 text-[#00ff7f]" /> }
              </button>
            </div>
            <div className="absolute bottom-[2px] w-full mx-auto left-0 right-0 flex justify-center items-end">
              {arrayToSort.map((value, index)=>(
                <div
                  key={index}
                  className="array-line bg-green-900 relative w-1 mx-0.5 shadow-lg rounded-lg"
                  style={{height: `${value}px`}}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
