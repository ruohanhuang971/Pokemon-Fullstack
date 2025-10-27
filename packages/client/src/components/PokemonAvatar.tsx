// display a head-shot of the pokemon + name
// to put into slots for team building/display

interface PokemonAvatarProps {
    // id: UniqueIdentifier;
    name: string;
    image: string | undefined;
    types: PokemonType[] | undefined;
}

interface PokemonType {
    type: { name: string; url: string };
}

const PokemonAvatar = ({ name, image, types }: PokemonAvatarProps) => {
    return (
        <div style={{ touchAction: 'none' }}>
            {/* placeholder square */}
            <div className="w-20 h-30 text-[10px] px-2 py-5 md:w-35 md:h-45 md:text-base md:px-4 md:py-5 flex flex-col justify-center items-center rounded-2xl bg-cyan-950 text-amber-100 font-bold cursor-grab active:cursor-grabbing">
                <img src={image} />
                <p>{name == 'null' ? 'drop here' : name}</p>
                <div>
                    {types?.map((t) => (
                        <div
                            key={t.type.name}
                            className="flex items-center gap-1"
                        >
                            <img
                                className="w-5 h-5"
                                src={`${t.type.name}.png`}
                            />
                            <span>{`${t.type.name} `}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonAvatar;
