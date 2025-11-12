import { useQueries } from '@tanstack/react-query';
import { PokemonApi } from '../../components/PokemonApi';
import axios from 'axios';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { pokemonTypes } from '../../assets/typeArray';

interface PokemonAnalysisProp {
    names: UniqueIdentifier[];
}

const PokemonAnalysis = ({ names }: PokemonAnalysisProp) => {
    const queries = useQueries({
        queries: names.map((n) => ({
            queryKey: [n],
            queryFn: () => PokemonApi.fetchSinglePokemon(n),
        })),
    });

    const data: Record<string, number> = {};
    // init values
    pokemonTypes.map((type) => (data[type] = 0));
    // set values
    queries.map((q) => {
        q.data.types.map((t: { type: { name: string; url: string } }) => {
            data[t.type.name] = (data[t.type.name] ?? 0) + 1;
        });
    });

    if (!queries || queries.length === 0)
        return <p>Please drag pokemon onto the slots to analyze</p>;

    return (
        <div className="flex gap-5 mx-auto text-sm mt-3">
            <div className="grid grid-cols-3 gap-1">
                {Object.entries(data).map((d) => (
                    <div
                        key={d.at(0)}
                        className="flex items-center justify-between mx-0.5 gap-1"
                    >
                        <div className="flex items-center gap-1">
                            <img src={`${d.at(0)}.png`} className="w-5 h-5" />
                            <span>
                                <em>{d.at(0)}</em>
                            </span>
                        </div>
                        <span>{d.at(1)}</span>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-1">
                {Object.entries(data).map((d) => (
                    <div
                        key={d.at(0)}
                        className="flex items-center justify-between mx-0.5 gap-1"
                    >
                        <div className="flex items-center gap-1">
                            <img src={`${d.at(0)}.png`} className="w-5 h-5" />
                            <span>
                                <em>{d.at(0)}</em>
                            </span>
                        </div>
                        <span>{d.at(1)}</span>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-1">
                {Object.entries(data).map((d) => (
                    <div
                        key={d.at(0)}
                        className="flex items-center justify-between mx-0.5 gap-1"
                    >
                        <div className="flex items-center gap-1">
                            <img src={`${d.at(0)}.png`} className="w-5 h-5" />
                            <span>
                                <em>{d.at(0)}</em>
                            </span>
                        </div>
                        <span>{d.at(1)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonAnalysis;
