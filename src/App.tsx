import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_ALPHABETICAL = 'alphabetical';
const SORT_BY_LENGTH = 'length';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

function sortGoods(goods: string[], sortField: string, isReserved: boolean) {
  const sortedGoods = [...goods];

  if (sortField === SORT_ALPHABETICAL) {
    sortedGoods.sort((goodA: string, goodB: string) =>
      goodA.localeCompare(goodB),
    );
  } else if (sortField === SORT_BY_LENGTH) {
    sortedGoods.sort(
      (goodA: string, goodB: string) => goodA.length - goodB.length,
    );
  }

  if (isReserved) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

function isInitialOrder(goods: string[], orirginalGoods: string[]) {
  return goods.every((good, index) => good === orirginalGoods[index]);
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = sortGoods(goodsFromServer, sortField, isReversed);
  const showResetButton = !isInitialOrder(visibleGoods, goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setSortField(SORT_ALPHABETICAL);
          }}
          className={cn('button is-info is-active', {
            'is-light': sortField !== SORT_ALPHABETICAL,
          })}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
          }}
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>
        <button
          type="button"
          onClick={() => {
            setIsReversed(prev => !prev);
          }}
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
