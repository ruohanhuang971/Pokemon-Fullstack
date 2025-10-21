// display a head-shot of the pokemon + name
// to put into slots for team building/display

type PokemonAvatarProps = {
    // id: UniqueIdentifier;
    name: string;
    image: string | undefined;
};

const PokemonAvatar = ({ name, image }: PokemonAvatarProps) => {
    return (
        <div>
            {/* placeholder square */}
            <div className="w-20 h-24 text-xs px-2 py-5 md:w-40 md:h-48 md:text-2xl md:px-4 md:py-5 flex flex-col justify-center items-center rounded-2xl bg-cyan-950 text-amber-100 font-bold cursor-grab active:cursor-grabbing">
                <img src={image} />
                <p>{name == 'null' ? 'drop here' : name}</p>
            </div>
        </div>
    );
};

export default PokemonAvatar;
