interface SearchBarProps {
    searchInput: string;
    onSearch: (input: string) => void;
}

const SearchBar = ({ searchInput, onSearch }: SearchBarProps) => {
    return (
        /* Update searchInput every time some new is entered */
        <div className="mt-10">
            <input
                type="type"
                placeholder="Search for pokemon..."
                value={searchInput}
                onChange={(e) => onSearch(e.target.value)}
                className="bg-amber-50 border border-amber-400 text-black w-full max-w-lg px-4 py-2 mx-auto rounded-md focus:border-amber-400"
            />
        </div>
    );
};

export default SearchBar;
