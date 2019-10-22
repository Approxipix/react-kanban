import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CardAdd from '../CardAdd';

const mockStore = configureStore([]);

describe('<CardAdd>', () => {
  let store;
  let props;
  let state;
  let component;
  let mockAddCard = jest.fn();

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = mockAddCard;
    props = {
      listId: 'ListID',
    };
    state = {
      isOpened: false,
      title: '',
    };

    const wrapper = shallow(<CardAdd store={store} {...props} />);
    component = wrapper.find('CardAdd').dive();
    component.setState({ ...state })
  });

  it('should render AddButton if isOpened is false', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render form if isOpened is true', () => {
    component.instance().toggleOpened();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('checks if toggleOpened sets isOpened correctly', () => {
    component.instance().toggleOpened();
    expect(component.instance().state.isOpened).toEqual(true);

    component.instance().toggleOpened();
    expect(component.instance().state.isOpened).toEqual(false);
  });

  it("should call toggleOpened after click on AddButton", () => {
    const spy = jest.spyOn(component.instance(), "toggleOpened");

    component.find('AddButton').simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should call toggleOpened after click on CancelButton", () => {
    const spy = jest.spyOn(component.instance(), "toggleOpened");

    component.setState({ isOpened: true });
    component.find('CancelButton').simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe('add card form', () => {
    beforeEach(() => {
      component.setState({ isOpened: true });
    });

    it("should call toggleOpened if key code equal 27", () => {
      const spy = jest.spyOn(component.instance(), "toggleOpened");

      component.instance().handleKeyDown({ keyCode: 27 });

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call handleChange on title change with the correct params', () => {
      const spy = jest.spyOn(component.instance(), "handleChange");
      const mockEvent = {
        target: {
          name: "title",
          value: "Test title"
        }
      };

      component.find("TextArea").simulate("change", mockEvent);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(mockEvent);
    });

    it('should call setState on title', () => {
      const mockEvent = {
        target: {
          name: "title",
          value: "Test Title"
        }
      };
      const expectedState = {
        title: "Test Title",
        isOpened: true
      };

      component.instance().handleChange(mockEvent);

      expect(component.state()).toEqual(expectedState)
    });

    it("should call handleSubmit with the correct params", () => {
      const spy = jest.spyOn(component.instance(), "handleSubmit");
      const mockEvent = {
        preventDefault: jest.fn()
      };

      component.setState({ title: "Test Title" });
      component.instance().handleSubmit(mockEvent);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should return handleSubmit if title is empty", () => {
      const spy = jest.spyOn(component.instance(), "handleSubmit");
      const mockEvent = {
        preventDefault: jest.fn()
      };

      component.instance().handleSubmit(mockEvent);

      expect(spy).toReturn();
    });

    it("should dispatch an action after handleSubmit", () => {
      const expectedAction = {
        type: 'ADD_CARD',
        payload: {
          listId: 'ListID',
          cardTitle: 'Test Title',
          newCardId: expect.any(String), //Date.now() id
        }
      };

      component.setState({ title: "Test Title" });
      component.find('SubmitButton').simulate('click');

      expect(mockAddCard).toHaveBeenCalledTimes(1);
      expect(mockAddCard).toHaveBeenCalledWith(expectedAction);
    });
  })
});

