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
    assignSlot: Record<UniqueIdentifier, UniqueIdentifier | null>;
}

const SearchResults = ({ assignSlot }: SearchResultsProps) => {
    // fetching pokemon here
    const { data, isLoading, error } = useQuery({
        queryKey: ['pokemon'],
        queryFn: () => PokemonApi.fetchAllPokemon(),
    });

    // const PageData = await PokemonApi.fetchPokemonPage(page);
    if (error) return <p>Something went wrong</p>;
    if (isLoading) return <p>...</p>;

    return (
        <div className="mt-10 md:mt-30 flex justify-center flex-wrap gap-4">
            {data.map((p: PokemonList, index: number) =>
                !Object.values(assignSlot).includes(p.name) ? (
                    <SearchOptions key={index} id={p.name}>
                        <SearchListItem name={p.name} />
                    </SearchOptions>
                ) : null
            )}
        </div>
    );
};

export default SearchResults;
