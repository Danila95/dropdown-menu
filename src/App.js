import React from 'react';
import './Dropdown/dropdown.css';
import Dropdown from './Dropdown/Dropdown';

const items = [
    {
        id: 1,
        value: 'Компьютер',
        icon: '🖥️',
    },
    {
        id: 2,
        value: 'Принтер',
        icon: '🖨️',
    },
    {
        id: 3,
        value: 'Клавиатура',
        icon: '⌨️',
    },
    {
        id: 4,
        value: 'Мышь',
        icon: '🖱️',
    }
];

function App() {
  return (
    <div className="container">
        {/*<Dropdown title="Выберите элемент" items={items} />*/}
        <Dropdown title="Выберите элемент" titleUrl="Создать список из json" items={items} multiSelect/>
        {/*<Dropdown title="Выберите элементы" items={items} multiSelect />*/}
    </div>
  );
}

export default App;
