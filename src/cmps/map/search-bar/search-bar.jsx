import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';
import './search-bar.scss';

const SearchBar = ({ panTo }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: 32.082399, lng: 34.779824 },
            radius: 5 * 1000, // turn 5 meters to 5 KM
        }
    })
    return (
        <div className='search-container'>
            <Combobox onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();
                try {
                    const results = await getGeocode({ address });
                    const { lat, lng } = await getLatLng(results[0]);
                    panTo({ lat, lng });
                } catch (err) {
                    console.log('Error:', err);
                }
                console.log(address);
            }}
            >
                <ComboboxInput
                    value={value}
                    onChange={(ev) => {
                        setValue(ev.target.value);
                    }}
                    disabled={!ready}
                    placeholder={'Search an address..'}
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === 'OK' &&
                            data.map((id, description) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}

export default SearchBar;