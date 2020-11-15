import 'reflect-metadata'
import 'regenerator-runtime/runtime'
import React from 'react'
import { mount, configure, ReactWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore  from '../redux/configureStore';
import { Provider } from 'react-redux';
import axios from 'axios';
import { fetchApiData } from '../redux/actions'
import CardList from '../components/card/cardList'
const store = configureStore()
configure({ adapter: new Adapter() })
jest.mock("axios");

describe('Filter functionality test', () => {
    let wrapper
    const getCardListComponent = () =>
    wrapper.update().find('CardList').instance()
    const data = [{
        "flight_number": 1,
        "mission_name": "FalconSat",
        "mission_id": [],
        "launch_year": "2006",
        "launch_success": false,
        "links":{
            "mission_patch": "https://images2.imgbox.com/40/e3/GypSkayF_o.png"
        }
    }];
    const resp= { data }
    axios.get.mockResolvedValue(resp);

    beforeEach(() => {
        wrapper = mount(
            <Provider store={ store }>
                <CardList/>
            </Provider>
        )
    })
    it('can successfully filter featch function', async(done) => {
        try {
            getCardListComponent().props
            .dispatch(fetchApiData('url'))
            await wrapper.update();
            expect(getCardListComponent().props.data).toEqual(
            data
            )
            expect(axios.get).toHaveBeenCalledTimes(1)
            done()
        } catch (error) {
          done.fail(error)
        }
    })
    it('can successfully handle api error', async(done) => {
        try {
            const errorResponse = {
                "status": 401,
                "response": {
                  "data": null,
                  "errors": [
                    {
                      "errorCode": 401,
                    }
                  ]
                }
              };
            axios.get.mockReturnValue(Promise.reject(errorResponse));
            getCardListComponent().props
            .dispatch(fetchApiData('url'))
            .then(() => {
                expect(getCardListComponent().props.error).toEqual(
                    errorResponse
                )
                expect(axios.get).toHaveBeenCalledTimes(2)
                done()
            })
            .catch((error) => {
                done.fail(error)
            })
        } catch (error) {
          done.fail(error)
        }
    })
})