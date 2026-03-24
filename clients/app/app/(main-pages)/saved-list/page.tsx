import SavedList from "@/components/pages/saved-list/SavedList"
import PageDetails from "@/components/ui/PageDetails"

const SavedListPage = () => {

    return (
        <div
            className="w-full flex justify-center"
        >
            <div
                className="mt-26 px-3 sm:w-[95%] sm:px-0 md:w-[70%] w-full flex flex-col gap-7.5"
            >
                <PageDetails
                    title="Saved List"
                    about="Your saved list is the place where you keep all the movies you love or plan to watch later."
                    backButton={false}
                />
                <SavedList
                />
            </div>
        </div>
    )

}

export default SavedListPage