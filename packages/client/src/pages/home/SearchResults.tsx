import { useQuery } from '@tanstack/react-query';
import { PokemonApi } from '../../components/PokemonApi';
import SearchListItem from './SearchListItem';
import SearchOptions from './SearchOptions';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { useEffect } from 'react';

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

/*
    TODO: FILTER POKEMON BY TYPE WITH: https://pokeapi.co/api/v2/type/7/
*/

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

    // filter search result
    const curDisplay = data?.filter(
        (p: PokemonList) =>
            !Object.values(assignSlot).includes(p.name) &&
            p.name.startsWith(searchInput)
    );

    const limit = 12;
    const totalPage = Math.round(curDisplay?.length / limit);

    const curPage = curDisplay?.slice(page * limit, (page + 1) * limit);

    useEffect(() => {
        onGetTotalPage(totalPage);
    }, [totalPage, onGetTotalPage]);

    if (error) return <p>Something went wrong</p>;
    if (isLoading) return <p>...</p>;

    // if there is no search result
    if (curDisplay?.length === 0)
        return (
            <h1 className="mt-5 md:mt-10">Can't find pokemon with that name</h1>
        );

    return (
        <div
            className="mt-5 md:mt-10 flex justify-center flex-wrap gap-4 max-w-screen-lg mx-auto"
            style={{ touchAction: 'none' }}
        >
            {curPage.map((p: PokemonList, index: number) => (
                <SearchOptions key={index} id={p.name}>
                    <SearchListItem name={p.name} />
                </SearchOptions>
            ))}
        </div>
    );
};

export default SearchResults;
