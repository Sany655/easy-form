import React, { useState } from 'react';

function DraggableList() {
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
    };

    const handleDragOver = e => {
        e.preventDefault();
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData('text/plain');
        const newItems = [...items];
        newItems[index] = items[draggedIndex];
        newItems[draggedIndex] = items[index];
        setItems(newItems);
    };

    return (
        <ul>
            {items.map((item, index) => (
                <li
                    key={index}
                    draggable
                    onDragStart={e => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={e => handleDrop(e, index)}
                >
                    <span>{item}</span>
                    <span>Hello</span>
                </li>
            ))}
        </ul>
    );
}

export default DraggableList;
