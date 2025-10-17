import { useQuery } from '@tanstack/react-query';
import { PokemonApi } from '../../components/PokemonApi';
import type { PokemonBasicInfo } from '../../components/PokemonApi';
import SearchListItem from './SearchListItem';

// type SearchResultsProp = {
//     page: number;
// };

// type PokemonPageProp = {
//     pokemon: PokemonBasicInfo[];
// };

export type PokemonList = {
    name: string;
    url: string;
};

const SearchResults = () => {
    // fetching pokemon here
    const { data, isLoading, error } = useQuery({
        queryKey: ['pokemon'],
        queryFn: () => PokemonApi.fetchAllPokemon(),
    });

    // const PageData = await PokemonApi.fetchPokemonPage(page);
    if (error) return <p>Something went wrong</p>;
    if (isLoading) return <p>...</p>;

    return (
        <div className="mt-10 flex justify-center flex-wrap gap-4 mx-auto">
            {data.map((p: PokemonList, index: number) => (
                //<div key={index}>
                <SearchListItem key={index} name={p.name} url={p.url} />
                //</div>
            ))}
        </div>
    );
};

export default SearchResults;
