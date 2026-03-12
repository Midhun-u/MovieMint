'use client'

import {
  Activity,
  useContext,
  useEffect,
  useState,
  type JSX,
} from "react"
import {
  Settings2 as FilterIcon,
  ChevronDown as DownArrowIcon,
  X as CloseIcon,
  ChevronLeft as BackIcon,
} from "lucide-react"
import MovieGenre from "./MovieGenre"
import MovieFormats from "./MovieFormats"
import MovieLanguage from "./MovieLanguage"
import { Button } from "../../ui/button"
import { FilterProvider } from "../../context/providers/FilterContext"
import { useRouter, useSearchParams } from "next/navigation"

const MovieFilter = () => {
  const [showFilterScreen, setShowFilterScreen] = useState<boolean>(false)
  const [ScreenDetails, setScreenDetails] = useState<{
    title: string
    Screen: () => JSX.Element | null
  }>({
    title: "",
    Screen: () => null,
  })
  const [showScreen, setShowScreen] = useState<boolean>(false)
  const [language, setLanguage] = useState<string>("")
  const [categories, setCategories] = useState<Array<string>>([])
  const [formats, setFormats] = useState<Array<string>>([])
  const filterContext = useContext(FilterProvider)
  const listClassName = `py-1.25 px-5 text-[0.9rem] cursor-pointer w-full hover:bg-foreground-theme-color/5 active:bg-foreground-theme-color/5`
  const buttonClassName = `max-[350px]:w-full text-foreground-theme-color bg-foreground-color flex items-center hover:bg-background-color border border-foreground-theme-color/15 text-[0.8rem]`
  const searchParam = useSearchParams()
  const category = searchParam.get("category")
  const router = useRouter()

  // Function for setting screen
  const handleSetScreen = (title: string, screen: () => JSX.Element) => {
    setScreenDetails({ title: title, Screen: screen })
    setShowScreen(true)
  }

  // Function for clearing all filteres
  const handleClearAllFilteres = () => {

    filterContext?.setCategories([])
    setCategories([])
    filterContext?.setLanguage("")
    setLanguage("")
    filterContext?.setFormats([])
    setFormats([])
    setShowFilterScreen(false)

    const urlSearchParams = new URLSearchParams(searchParam.toString())
    urlSearchParams.delete("category")
    
    router.push(`?${urlSearchParams.toString()}`)

  }

  // Function for applying filters
  const handleApplyFilters = () => {
    filterContext?.setCategories(categories)
    filterContext?.setFormats(formats)
    filterContext?.setLanguage(language)

    setShowFilterScreen(false)
  }

  useEffect(() => {
    (() => {
      handleSetScreen("genre", MovieGenre)
    })()
  }, [])

  useEffect(() => {
    (() => {
      if(category){

        setCategories(pre => {
          return [...pre, category]
        })

      }
      setShowScreen(false)
    })()
  }, [category])

  return (
    <>
      <Activity mode={showFilterScreen ? "visible" : "hidden"}>
        <div className="absolute z-7 top-0 left-0 w-full h-full bg-foreground-color opacity-[0.5]"></div>
      </Activity>
      <div
        onClick={() => setShowFilterScreen(true)}
        className="w-25 h-min z-0 relative flex gap-2.5 bg-foreground-color border border-foreground-theme-color/15 p-1.25 pr-5 text-[0.8rem] rounded-[5px] font-medium items-center cursor-pointer"
      >
        <FilterIcon size={15} />
        <span>Filter</span>
        <DownArrowIcon className={"absolute right-2.5"} size={15} />
      </div>
      <Activity mode={showFilterScreen ? "visible" : "hidden"}>
        <div className="absolute z-8 w-full top-25 h-[calc(100% - 60px)] left-0 flex justify-center items-center p-2.5">
          <div className="w-150 max-[350px]:pl-5 h-100 bg-foreground-color z-7 rounded-[10px] flex flex-col gap-1.25 border border-foreground-theme-color/15 pb-5 pr-5">
            <div className={`flex justify-between items-center pt-2.5 pb-2.5 pl-5 `}>
              <span className="text-[0.9rem] font-medium">Filter By</span>
              <div
                onClick={() => setShowFilterScreen(false)}
                className={`p-1.25 flex justify-center items-center rounded-full cursor-pointer hover:bg-foreground-theme-color/5`}
              >
                <CloseIcon strokeWidth={1.7} size={20} />
              </div>
            </div>
            <div className="max-[350px]:grid-cols-[1fr] grid grid-cols-[max-content_1fr] h-full overflow-hidden">
              <div
                className={`${showScreen? "max-[350px]:hidden": "flex"} list-none flex-col h-full overflow-x-auto`}
              >
                <li
                  className={
                    ScreenDetails.title === "genre" ? listClassName + " min-[350px]:bg-foreground-theme-color/5 active:bg-foreground-theme-color/5" : listClassName
                  }
                  onClick={() => handleSetScreen("genre", MovieGenre)}
                >
                  Genre
                </li>
                <li
                  className={
                    ScreenDetails.title === "languages" ? listClassName + " bg-foreground-theme-color/5" : listClassName
                  }
                  onClick={() => handleSetScreen("languages", MovieLanguage)}
                >
                  Languages
                </li>
                <li
                  className={
                    ScreenDetails.title === "formats" ? listClassName + " bg-foreground-theme-color/5" : listClassName
                  }
                  onClick={() => handleSetScreen("formats", MovieFormats)}
                >
                  Formats
                </li>
              </div>
              <div className={`${showScreen? "block": "max-[350px]:hidden"} w-full h-full bg-foreground-theme-color/5 overflow-scroll`}>
                <FilterProvider
                  value={{
                    categories: categories,
                    setCategories: setCategories,
                    formats: formats,
                    setFormats: setFormats,
                    language: language,
                    setLanguage: setLanguage,
                  }}
                >
                  <ScreenDetails.Screen />
                </FilterProvider>
              </div>
            </div>
            <div className="max-[350px]:flex-col w-full flex justify-end items-center gap-2.5">
              <Button
                className={
                  buttonClassName + ` min-[350px]:hidden ${showScreen? "flex": "hidden"}`
                }
                onClick={() => setShowScreen(false)}
              >
                <BackIcon size={20} strokeWidth={1.5} />
                <span>Back</span>
              </Button>
              <Button
                onClick={() => handleClearAllFilteres()}
                className={buttonClassName}
              >
                <span>Clear Filters</span>
              </Button>
              <Button
                onClick={() => handleApplyFilters()}
                className={buttonClassName + " bg-primary-color text-black border-primary-color hover:bg-primary-accent-color hover:border-primary-accent-color"}
              >
                <span>Apply Filters</span>
              </Button>
            </div>
          </div>
        </div>
      </Activity>
    </>
  )
}

export default MovieFilter
