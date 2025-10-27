import {
    DndContext,
    TouchSensor,
    MouseSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { act, useState } from 'react';
import SearchOptions from './SearchOptions'; // draggable
import TeamSlots from './TeamSlots'; // droppable
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import SearchListItem from './SearchListItem';
import PokemonAvatar from '../../components/PokemonAvatar';
import PokemonAnalysis from './PokemonAnalysis';

/*
    TeamBuilder: drag pokemon cards from search options to teamSlot
*/

const TeamBuilder = () => {
    const containers = ['A', 'B', 'C', 'D', 'E', 'F'];

    // track item in slot
    // Record<K, V>: K = key of object, V = value of key
    const [assignSlot, setAssignSlot] = useState<
        Record<UniqueIdentifier, UniqueIdentifier | null>
    >({
        A: null,
        B: null,
        C: null,
        D: null,
        E: null,
        F: null,
    });

    // user input in search bar
    const [searchInput, setSearchInput] = useState<string>('');
    // current page number for result
    const [resultPage, setResultPage] = useState<number>(0);
    // total page
    const [totalResultPage, setTotalResultPage] = useState<number>(0);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200,
                tolerance: 5,
            },
        })
    );

    const handleGetTotalPage = (pageNumber: number) => {
        setTotalResultPage(pageNumber);
    };

    const handlePreviousPage = () => {
        if (resultPage > 0) {
            setResultPage((page) => page - 1);
        }
    };

    const handleNextPage = () => {
        if (resultPage < totalResultPage) {
            setResultPage((page) => page + 1);
        }
    };

    const handleOnChangeInput = (input: string) => {
        setResultPage(0);
        setSearchInput(input);
    };

    const selectedPokemons = Object.values(assignSlot).filter(
        (value) => value !== null
    );

    return (
        <div className="flex flex-col justify-center item-center m-4 md:m-6">
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                {/* Row of droppable slots */}
                <div className="flex flex-wrap space-x-1 justify-center gap-4 my-8">
                    {containers.map((id) => (
                        <TeamSlots id={id} key={id}>
                            {assignSlot[id] && ( // if dragged slot has stuff in it
                                // render the card
                                <div>
                                    <SearchOptions id={assignSlot[id]!}>
                                        <SearchListItem
                                            name={String(assignSlot[id])}
                                        />
                                    </SearchOptions>
                                    <button className="text-[10px] md:text-sm">
                                        SHOW DETAILS
                                    </button>
                                </div>
                            )}
                            {!assignSlot[id] && (
                                <PokemonAvatar
                                    name="null"
                                    image={undefined}
                                    types={undefined}
                                /> // set to blank slot if not
                            )}
                        </TeamSlots>
                    ))}
                </div>

                <button className="bg-amber-400 w-50 mx-auto rounded-full">
                    Analyze Team
                </button>
                <PokemonAnalysis names={selectedPokemons} />

                <SearchBar
                    searchInput={searchInput}
                    onSearch={handleOnChangeInput}
                />

                <div className="flex justify-center items-center text-center gap-2 mt-2">
                    <button
                        onClick={handlePreviousPage}
                        className="px-2 py-1 bg-amber-500 text-white rounded hover:bg-amber-600"
                    >
                        Previous
                    </button>
                    <p>
                        {resultPage + 1} / {totalResultPage}
                    </p>
                    <button
                        onClick={handleNextPage}
                        className="px-2 py-1 bg-amber-500 text-white rounded hover:bg-amber-600"
                    >
                        Next
                    </button>
                </div>

                {/* Draggable Items */}
                <SearchResults
                    searchInput={searchInput}
                    assignSlot={assignSlot}
                    page={resultPage}
                    onGetTotalPage={handleGetTotalPage}
                />
            </DndContext>
        </div>
    );

    function handleDragEnd(event: DragEndEvent) {
        const { over, active } = event;

        if (over) {
            // set item into slot it is dragged in
            setAssignSlot((prev) => {
                const newAssignments = { ...prev };

                // if the the dragged card is already in a slot, don't add it
                // Find the slot that contains this draggable
                const slotId = Object.keys(prev).find(
                    (key) => prev[key] === active.id
                );

                if (!slotId) {
                    newAssignments[over.id] = active.id; // add it to slot
                } else {
                    newAssignments[slotId] = null; // remove it from the slot
                    newAssignments[over.id] = active.id; // add it to new slot
                }

                return newAssignments;
            });
        } else {
            setAssignSlot((prev) => {
                const newAssignments = { ...prev }; // prev is previous value of state

                // Find the slot that contains this draggable
                const slotId = Object.keys(prev).find(
                    (key) => prev[key] === active.id
                );

                if (slotId) {
                    newAssignments[slotId] = null; // remove it from the slot
                }

                return newAssignments;
            });
        }
    }
};

export default TeamBuilder;
