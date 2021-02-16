import React, { useState } from 'react';

function Dropdown({ title, icon, items, multiSelect = false }) { // multiSelect - позволяет делать множест. выбор {true/false}
    const [open, setOpen] = useState(false); // open - переменная, которая хранит в себе состояние dropdown menu {Open / Close}
    const [selection, setSelection] = useState([]); // selection - переменная, которая показывает выбраный(е) пункт(ы)
    const [searchedItem, setSearchedItem] = useState('');
    const [changeInput, setChangeInput] = useState(false);
    const toggle = () => setOpen(!open);
    const toggleInput = () => setChangeInput(!changeInput);


    function handleOnClick(item) {
        if (!selection.some(current => current.id === item.id)) {
            if (!multiSelect) {
                setSelection([item]);
            } else if (multiSelect) {
                setSelection([...selection, item]);
            }
        } else {
            let selectionAfterRemoval = selection; // переменная, которая показывает, сколько остал. выделенных пунктов
            selectionAfterRemoval = selectionAfterRemoval.filter(
                current => current.id !== item.id
            );
            setSelection([...selectionAfterRemoval]);
        }
    }

    function isItemInSelection(item) { // функция проверяет на наличие выделенных пунктов
        if (selection.some(current => current.id === item.id)) {
            return true;
        }
        return false;
    }
    // обработчик события при поиске
    function handleSearch(event) {
        setSearchedItem(event.target.value);
        return console.log(event.target.value);
    }

    // Filter function
    const filteredItems = items.filter((item) =>
        item.value.toLowerCase().includes(searchedItem.toLowerCase())
    );
    return (
        <div className="wrapper">
            <div
                tabIndex={0}
                className="header"
                role="button"
                onKeyPress={() => toggle(!open)}
                onClick={() => toggle(!open)}
            >
                <div className="header__title">
                    <p className="header__title--bold">{title}</p>
                </div>
                <div className="header__action">
                    <p>{open ? 'Закрыть' : 'Открыть'}</p>
                </div>
            </div>
            {open ? (
                <ul className="list">
                    <input type="text"  className="search" placeholder="Поиск..." onFocus={() => toggleInput(!changeInput)}
                           onBlur={() => toggleInput(changeInput)}
                           onChange={(event) => {handleSearch(event);}} />
                    { changeInput ? filteredItems.map((item)=> (
                        <li className="list-item" key={item.id}>
                            <button type="button" onClick={() => handleOnClick(item)}>
                                <div className="name-elem">
                                    <span>{item.value}</span>
                                    <span>{item.icon}</span>
                                </div>
                                <span>{isItemInSelection(item) ? '✔️' : ''}</span>
                            </button>
                        </li>
                        )) :
                        items.map(item => (
                            <li className="list-item" key={item.id}>
                                <button type="button" onClick={() => handleOnClick(item)}>
                                    <div className="name-elem">
                                        <span>{item.value}</span>
                                        <span>{item.icon}</span>
                                    </div>
                                    <span>{isItemInSelection(item) ? '✔️' : ''}</span>
                                </button>
                            </li>
                        ))}
                </ul>
            ) : ''}
        </div>
    );
}

export default Dropdown;