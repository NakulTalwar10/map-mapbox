// Home.js
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Navbar, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Map from '../Map/Map';
import './Home.css';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        axios.get('https://restcountries.com/v2/all')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error('Error fetching country data:', error);
            });
    }, []);

    const handleSearch = () => {
        const foundCountry = countries.find(country => country.name.toLowerCase() === searchInput.toLowerCase());
        if (foundCountry) {
            setSelectedCountry(foundCountry);
        } else {
            console.log('Country not found:', searchInput);
        }
    };

    return (
        <div className="home-container">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="justify-content-center">
                        <Form className="d-flex flex-column flex-lg-row align-items-stretch">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2 search-input mb-2 mb-lg-0"
                                aria-label="Search"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <Button variant="outline-success" onClick={handleSearch} className="mb-2 mb-lg-0">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Row className="map-and-details">
                <Col lg={8} className="map-col">
                    <Map
                        countries={countries}
                        selectedCountry={selectedCountry}
                        setSelectedCountry={setSelectedCountry}
                    />
                </Col>
                <Col lg={4} className="details-col">
                    {selectedCountry && (
                        <div className="country-card">
                            <div className="country-card-header">
                                {selectedCountry.name}
                            </div>
                            <div className="country-card-body">
                                <img src={selectedCountry.flags.png} alt={selectedCountry.name} style={{ width: "150px" }} />
                                <div className="details-section">
                                    <p className="section-title">Capital</p>
                                    <p className="section-content">{selectedCountry.capital}</p>
                                </div>
                                <div className="details-section">
                                    <p className="section-title">Population</p>
                                    <p className="section-content">{selectedCountry.population}</p>
                                </div>
                                <div className="details-section">
                                    <p className="section-title">Area</p>
                                    <p className="section-content">{selectedCountry.area} km²</p>
                                </div>
                                <div className="details-section">
                                    <p className="section-title">Borders</p>
                                    <p className="section-content">{selectedCountry.borders.join(', ')}</p>
                                </div>
                                <div className="details-section">
                                    <p className="section-title">Languages</p>
                                    <p className="section-content">{selectedCountry.languages.map(lang => lang.name).join(', ')}</p>
                                </div>
                                <div className="details-section">
                                    <p className="section-title">Currencies</p>
                                    <p className="section-content">{selectedCountry.currencies.map(curr => curr.name).join(', ')}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default Home;
