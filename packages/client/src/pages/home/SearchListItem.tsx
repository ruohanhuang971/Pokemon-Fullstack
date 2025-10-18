import { useQuery } from '@tanstack/react-query';
import { PokemonApi } from '../../components/PokemonApi';
import PokemonAvatar from '../../components/PokemonAvatar';

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
    if (isLoading) return <p>...</p>;

    return (
        <div>
            <PokemonAvatar
                name={data.name}
                image={data.sprites.front_default}
            />
        </div>
    );
};

export default SearchListItem;
