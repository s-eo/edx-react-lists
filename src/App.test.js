import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import AddItem from './AddItem.js';
import AddList from './AddList.js';
import App from './App';
import List from './List.js';
import ListItem from './ListItem.js';
import Lists from './Lists.js';

Enzyme.configure({ adapter: new Adapter()});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Interaction tests', () => {

    it('After entering name and clicking button in AddList, Lists should have one List element', () => {
        var wrapper = mount(<App />);
        var addList = wrapper.find('AddList');
        addList.find('#newID').get(0).value = 'DOGS';
        addList.find('form').simulate('submit');
        expect(wrapper.find('Lists').find('List'), 'There should be one List component within Lists').length(1);

        var list = wrapper.find('Lists').find('List');
        // make sure they don't change the name of the props!
        expect(list.props().name == 'DOGS', "'name' prop in List component is incorrect").equals(true);

    });

    it('After adding one List, should be possible to add another', () => {
        var wrapper = mount(<App />);
        var addList = wrapper.find('AddList');
        addList.find('#newID').get(0).value = 'DOGS';
        addList.find('form').simulate('submit');

        addList = wrapper.find('AddList');
        addList.find('#newID').get(0).value = 'CATS';
        addList.find('form').simulate('submit');


        expect(wrapper.find('Lists').find('List'), 'There should be two List components within Lists').length(2);

        var lists = wrapper.find('Lists').find('List');
        //console.log(lists.nodes[1].props);
        // make sure they don't change the name of the props!
        expect(lists.nodes[1].props.name == 'CATS', "'name' prop in second List component is incorrect").equals(true);

    });

    it('Should be possible to add item name to List using form', () => {
        var wrapper = mount(<App />);
        var addList = wrapper.find('AddList');
        addList.find('#newID').get(0).value = 'DOGS';
        addList.find('form').simulate('submit');
        //expect(wrapper.find('Lists').find('List')).length(1);

      /*
       it would of course be nice to create the List without the App but, uh.....
       */

        var list = wrapper.find('Lists').find('List'); //mount(<List name='test' items={[]} addItem={wrapper.instance().handleAddItem} />);
        //var list = mount(<List name='test' items={[]} addItem={wrapper.handleAddItem} />);
      /*
       okay, we have a List
       get its AddItem component
       get that component's form
       submit some stuff
       check that the List now has a ListItem
       */
        var addItem = list.find('AddItem');
        addItem.find("input[type='text']").get(0).value = 'Snoopy';
        addItem.find('form').simulate('submit');

        list = wrapper.find('Lists').find('List');
        expect(list.find('ListItem'), 'There should be one ListItem component in List').length(1);

        expect(list.find('ListItem').props().item.name == 'Snoopy', "'item.name' prop of ListItem is incorrect").equals(true);

    });

    it('Should be possible to add more than one item name to List using form', () => {
        var wrapper = mount(<App />);
        var addList = wrapper.find('AddList');
        addList.find('#newID').get(0).value = 'DOGS';
        addList.find('form').simulate('submit');

        var list = wrapper.find('Lists').find('List');

        var addItem = list.find('AddItem');
        addItem.find("input[type='text']").get(0).value = 'Snoopy';
        addItem.find('form').simulate('submit');

        list = wrapper.find('Lists').find('List');
        addItem = list.find('AddItem');
        addItem.find("input[type='text']").get(0).value = 'Lola';
        addItem.find('form').simulate('submit');


        list = wrapper.find('Lists').find('List');
        expect(list.find('ListItem'), 'There should be two ListItem components in List').length(2);
        var listItems = list.find('ListItem');
        //console.log(listItems.nodes[1].props);
        var name = listItems.nodes[1].props.item.name;
        expect(name == 'Lola', "'item.name' prop in second ListItem is incorrect").equals(true);
        //expect(list.find('ListItem').get(1).props().item.name == 'Lola').equals(true);
        //expect(list.find('ListItem').nodes[1].props().item.name == 'Snoopy').equals(true);

    });

    it('Should be possible to change list item color from black to gray by clicking on text once', () => {
        var wrapper = mount(<App />);
        var addList = wrapper.find('AddList');
        addList.find('#newID').get(0).value = 'DOGS';
        addList.find('form').simulate('submit');

        var list = wrapper.find('Lists').find('List');

        var addItem = list.find('AddItem');
        addItem.find("input[type='text']").get(0).value = 'Snoopy';
        addItem.find('form').simulate('submit');

        var listItem = wrapper.find('Lists').find('List').find('ListItem');
        listItem.find('span').simulate('click');

        listItem = wrapper.find('Lists').find('List').find('ListItem');
        var span = listItem.find('span');
        //console.log(span);
        expect(span.prop('style').color == 'gray', "'span' element in ListItem should have color attribute equal to 'gray'").equals(true);
    });

    it('Should be possible to change list item color from gray back to black by clicking on text twice', () => {
        var wrapper = mount(<App />);
        var addList = wrapper.find('AddList');
        addList.find('#newID').get(0).value = 'DOGS';
        addList.find('form').simulate('submit');

        var list = wrapper.find('Lists').find('List');

        var addItem = list.find('AddItem');
        addItem.find("input[type='text']").get(0).value = 'Snoopy';
        addItem.find('form').simulate('submit');

        var listItem = wrapper.find('Lists').find('List').find('ListItem');
        listItem.find('span').simulate('click');

        listItem = wrapper.find('Lists').find('List').find('ListItem');
        listItem.find('span').simulate('click');

        listItem = wrapper.find('Lists').find('List').find('ListItem');
        var span = listItem.find('span');
        //console.log(span);
        expect(span.prop('style').color == 'black', "'span' element in ListItem should have color attribute equal to 'black'").equals(true);
    });

  /*
   it('Should be possible to add item values to List using form', () => {
   var wrapper = mount(<App />);
   var addList = wrapper.find('AddList');
   addList.find('#newID').get(0).value = 'DOGS';
   addList.find('form').simulate('submit');
   var list = wrapper.find('Lists').find('List');
   var addItem = list.find('AddItem');
   // enter the name
   addItem.find("input[type='text']").get(0).value = 'Snoopy';
   // click Add Value button
   var button = addItem.find("button");
   //console.log(button);
   button.simulate('click');
   // enter the key and value
   //var div = addItem.find('.newCat');
   //console.log(div);
   //console.log(div.find("input[type='text']"));
   //console.log(div.find(".addItemText"))
   //div.find(".addItemText").get(0).value = 'breed';
   //div.find(".addItemText").get(1).value = 'beagle';
   //console.log(addItem.find('input').length);


   var div = addItem.find('#addDOGS');
   console.log(div.find('input').length);


   //addItem.find("input").get(0).value = 'breed';
   //addItem.find("input").get(1).value = 'beagle';


   // submit the form
   addItem.find('form').simulate('submit');

   var listItem = wrapper.find('Lists').find('List').find('ListItem');
   // see that it contains the entered data
   console.log(listItem.props().item);

   });
   */
});



/**************************/
/**** Helper Functions ****/
/**************************/

var addListHelper = function() {
    console.log('Adding list!');
}

var addItemHelper = function() {
    console.log('Adding item!');
}

