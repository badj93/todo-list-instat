import React, {FunctionComponent, useEffect} from 'react';
import {compose} from 'recompose';
import {Container, Form, Input, Label, Item, Number, Name, Checkbox} from './styles';
import {inject, observer} from "mobx-react";
import {ListItem, ListStore, Event} from "../../interfaces";
import { useRef } from 'react';

interface Props {
  readonly listStore: ListStore;
}

const List: FunctionComponent<Props> = (props): JSX.Element => {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener('keypress', onWindowKeyDown);

    return (): void => {
      document.removeEventListener('keypress', onWindowKeyDown);
    };
  }, []);

  const addItemAndFilter = (): void => {
    if (inputEl.current) {
      const title = inputEl.current.value.trim();

      if (title !== '') {
        props.listStore.addItem({
          id: props.listStore.listCount + 1,
          title: inputEl.current.value,
          isMarked: false
        })

        props.listStore.filter(inputEl.current.value)
      }
    }
  }

  const onWindowKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      addItemAndFilter();
    }
  }

  return (
    <React.Fragment>
      <Form>
        <Label>
          <Input onChange={(e: Event): void => props.listStore.filter(e.target.value)}
                 ref={inputEl}
          />
        </Label>
        <button onClick={addItemAndFilter}>Добавить</button>
      </Form>
      {
        props.listStore.getList.length > 0
          ?
            <Container>
              {
                props.listStore.getList.map((item: ListItem) => {
                  return (
                    <Item>
                      <Number>{item.id}</Number>
                      <Name>{item.title}</Name>
                      <Checkbox
                        onClick={(): void => props.listStore.setChecked(item.id)}
                        checked={item.isMarked}
                      />
                    </Item>
                  )
                })
              }
            </Container>
          :
            <Container>
              <p>Пусто!</p>
            </Container>
      }
    </React.Fragment>
  )
}

export default compose(
  inject('listStore'),
  observer
)(List);