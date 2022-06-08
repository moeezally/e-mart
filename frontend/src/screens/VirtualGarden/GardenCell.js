import {useDrop} from "react-dnd";
import React, {useState, useEffect} from "react";

export default function GardenCell({r, c, children, replaceCell}) {

    const [{isOver}, drop] = useDrop(() => ({
        accept: 'card', drop: (item) => replaceCell(r, c, item), collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }), [r, c])

    return <>
        <div ref={drop} className='m-2' style={{
            position: 'relative',
        }}>
            {children}
            {isOver && (<div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    borderRadius: '0.5rem',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'lightgray',
                }}
            />)}
        </div>
    </>;
}