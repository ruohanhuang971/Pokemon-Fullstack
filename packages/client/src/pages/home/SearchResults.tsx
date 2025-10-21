import { useQuery } from '@tanstack/react-query';
import { PokemonApi } from '../../components/PokemonApi';
import SearchListItem from './SearchListItem';
import SearchOptions from './SearchOptions';
import type { UniqueIdentifier } from '@dnd-kit/core';

export type PokemonList = {
    name: string;
    url: string;
};

interface SearchResultsProps {
    searchInput: string; // what user searched
    assignSlot: Record<UniqueIdentifier, UniqueIdentifier | null>; // what is already in the slots
    page: number;
    onGetTotalPage: (i: number) => void;
}

const SearchResults = ({
    searchInput,
    assignSlot,
    page,
    onGetTotalPage,
}: SearchResultsProps) => {
    // fetching pokemon here
    const { data, isLoading, error } = useQuery({
        queryKey: [`pokemon`],
        queryFn: () => PokemonApi.fetchAllPokemon(),
    });

    // const PageData = await PokemonApi.fetchPokemonPage(page);
    if (error) return <p>Something went wrong</p>;
    if (isLoading) return <p>...</p>;

    // filter search result
    const curDisplay = data.filter(
        (p: PokemonList) =>
            !Object.values(assignSlot).includes(p.name) &&
            p.name.startsWith(searchInput)
    );

    // if there is no search result
    if (curDisplay.length === 0) return <h1>NOTHING HERE</h1>;
    const limit = 18;
    const totalPage = Math.round(curDisplay.length / limit);
    onGetTotalPage(totalPage);
    const curPage = curDisplay.slice(page * limit, (page + 1) * limit);

    return (
        <div className="mt-10 md:mt-20 flex justify-center flex-wrap gap-4">
            {curPage.map((p: PokemonList, index: number) => (
                <SearchOptions key={index} id={p.name}>
                    <SearchListItem name={p.name} />
                </SearchOptions>
            ))}
        </div>
    );
};

export default SearchResults;
