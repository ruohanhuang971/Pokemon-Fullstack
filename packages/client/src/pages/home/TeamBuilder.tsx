import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { useState } from 'react';
import SearchOptions from './SearchOptions'; // draggable
import TeamSlots from './TeamSlots'; // droppable
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import SearchListItem from './SearchListItem';
import PokemonAvatar from '../../components/PokemonAvatar';

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

    console.log(assignSlot);

    return (
        <div className="flex flex-col justify-center item-center">
            <DndContext onDragEnd={handleDragEnd}>
                {/* Row of droppable slots */}
                <div className="flex justify-center space-x-6 mb-8">
                    {containers.map((id) => (
                        <TeamSlots key={id} id={id}>
                            {assignSlot[id] ? ( // if dragged slot has stuff in it
                                // render the card
                                <SearchOptions id={assignSlot[id]!}>
                                    <SearchListItem
                                        name={String(assignSlot[id])}
                                    />
                                </SearchOptions>
                            ) : (
                                <PokemonAvatar name="null" image={''} /> // set to blank slot if not
                            )}
                        </TeamSlots>
                    ))}
                </div>

                <SearchBar />

                {/* Draggable Items */}
                <SearchResults assignSlot={assignSlot} />
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
