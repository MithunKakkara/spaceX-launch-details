import 'reflect-metadata'
import React from 'react'
import { mount, configure, ReactWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore  from '../redux/configureStore';
import { Provider } from 'react-redux';
import axios from 'axios';
import Filter from '../components/filter/filter'
const store = configureStore()
configure({ adapter: new Adapter() })
jest.mock("axios");

describe('Filter functionality test', () => {
    let wrapper
    const getRootComponent = () =>
    wrapper.update().find('Filter').instance()
    const data = [{
        "flight_number": 1,
        "mission_name": "FalconSat",
        "mission_id": [],
        "launch_year": "2006",
        "launch_success": false,
    }];
    const resp= { data }
    axios.get.mockResolvedValue(resp);

    beforeEach(() => {
        wrapper = mount(
            <Provider store={ store }>
                <Filter />
            </Provider>
        )
    })
    it('can successfully filter featch function', (done) => {
        try {
            getRootComponent()
            .applyFilter({
                yearSelected:'2006',
                succuessfullLanding:'true',
                successfullLaunch:'true'
            })
            wrapper.update();
            expect(getRootComponent().props.data).toEqual(
            data
            )
            expect(axios.get).toHaveBeenCalledTimes(2)
            done()
        } catch (error) {
          done.fail(error)
        }
    })
    
})