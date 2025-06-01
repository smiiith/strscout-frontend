import React, { useState, useRef, useEffect } from 'react';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
// import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import '@geoapify/geocoder-autocomplete/styles/round-borders.css';


interface AddressData {
    formattedAddress: string;
    latitude: number;
    longitude: number;
}

interface GeoapifyAddressAutocompleteProps {
    apiKey: string;
    onAddressSelect?: (address: AddressData) => void;
}

const GeoapifyAddressAutocomplete: React.FC<GeoapifyAddressAutocompleteProps> = ({
    apiKey,
    onAddressSelect
}) => {
    const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    function onPlaceSelect(value: any) {
        setIsLoading(false);

        if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
        }

        if (value && value.properties) {
            const { lat, lon, formatted } = value.properties;
            const addressData: AddressData = {
                formattedAddress: formatted,
                latitude: lat,
                longitude: lon,
            };

            setSelectedAddress(addressData);

            if (onAddressSelect) {
                onAddressSelect(addressData);
            }

        } else {
            setSelectedAddress(null);
            if (onAddressSelect) {
                onAddressSelect({
                    formattedAddress: "",
                    latitude: 0,
                    longitude: 0,
                });
            }
        }
    }

    function onSuggestionsChange(suggestions: any) {

        if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
        }

        if (suggestions && suggestions.length > 0) {
            setIsLoading(false);
        }
    }

    // Monitor input changes via DOM events
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleInput = (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target && target.value && target.value.length > 2) {
                // Clear existing timeout
                if (loadingTimeoutRef.current) {
                    clearTimeout(loadingTimeoutRef.current);
                }

                // Show loading after a short delay
                loadingTimeoutRef.current = setTimeout(() => {
                    setIsLoading(true);
                }, 300);
            } else {
                setIsLoading(false);
                if (loadingTimeoutRef.current) {
                    clearTimeout(loadingTimeoutRef.current);
                }
            }
        };

        // Listen for input events on any input within the container
        container.addEventListener('input', handleInput);

        return () => {
            container.removeEventListener('input', handleInput);
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
            }
        };
    }, []);

    return (
        <GeoapifyContext apiKey={apiKey}>
            <div className="w-full relative" ref={containerRef}>
                <GeoapifyGeocoderAutocomplete
                    placeholder="Enter an address..."
                    debounceDelay={300}
                    lang="en"
                    countryCodes={['us', 'ca']}
                    placeSelect={onPlaceSelect}
                    suggestionsChange={onSuggestionsChange}
                />
                {isLoading && (
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-900"></div>
                    </div>
                )}
            </div>
        </GeoapifyContext>
    );
};

export default GeoapifyAddressAutocomplete;