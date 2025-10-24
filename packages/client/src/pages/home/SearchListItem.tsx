import { useQuery } from '@tanstack/react-query';
import { PokemonApi } from '../../components/PokemonApi';
import PokemonAvatar from '../../components/PokemonAvatar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type ListItem = {
    name: string;
};

const SearchListItem = ({ name }: ListItem) => {
    // fetching single pokemon here
    const { data, isLoading, error } = useQuery({
        queryKey: [name],
        queryFn: () => PokemonApi.fetchSinglePokemon(name),
    });

    // console.log(data.name, data.sprites.front_default);
    if (error) return <p>error.message</p>;
    if (isLoading)
        return (
            <div className="w-20 h-25 text-[10px] px-2 py-5 md:w-35 md:h-40 md:text-base md:px-4 md:py-5 flex flex-col justify-center items-center rounded-2xl bg-cyan-950 text-amber-100 font-bold cursor-grab active:cursor-grabbing">
                <Skeleton height={100} />
            </div>
        );

    return (
        <div style={{ touchAction: 'none' }}>
            <PokemonAvatar
                name={data.name}
                image={data.sprites.front_default}
                types={data.types}
            />
        </div>
    );
};

export default SearchListItem;
