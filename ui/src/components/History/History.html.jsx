import React from 'react';
import { Button, Card, Col, Collapse, Form, ListGroup, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ConvertMillisecondsToDate } from '../../utils/DateFormat';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import CustomCalendarInput from '../Shared/CustomCalendarInput/CustomCalendarInput';
import { currencySymbols } from '../../utils/CurrencySymbols';
import ReactHtmlParser from 'react-html-parser';

function HistoryHtml(props) {
    const transactionsHeaders = ['Date', 'Description', 'Buy', 'Sell'];
    const displayTransactionsHeaders = transactionsHeaders.map(header => <th className="text-nowrap" key={header}>{header}</th>);
    const renderTransactionsTableData = () => {
        return (props.data.isLoadingTransactions ?
            <tr>
                <td className="text-center" colSpan={transactionsHeaders.length}><FontAwesomeIcon icon={['fas', 'spinner']} className="fa-2x fa-spin" /></td>
            </tr>
            : (props.data.transactions.length > 0 ?
                props.data.transactions.map((info, index) => {
                    const { date, formattedNote, purchaseAmount, purchaseCurrency, sellAmount } = info; //destructuring
                    return (
                        <tr key={index}>
                            <td>{ConvertMillisecondsToDate(date)}</td>
                            <td>{ReactHtmlParser(formattedNote)}</td>
                            <td>{purchaseCurrency} {parseFloat(purchaseAmount).toFixed(2)}</td>
                            <td>GBP {sellAmount}</td>
                        </tr>
                    )
                })
                :
                <tr>
                    <td className="text-center" colSpan={transactionsHeaders.length}>No data</td>
                </tr>
            )
        )
    }

    const customStyles = {
        container: (provided) => ({
            ...provided,
            width: '100%'
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "whitesmoke"
        }),
        control: (provided) => ({
            ...provided,
            backgroundColor: "whitesmoke"
        }),
    }

    return (
        <>
            {/* Advanced Search code */}
            <Card className="mt-2 mb-3">
                <Card.Header>
                    <Button variant="info" onClick={props.handleSearchCollapse}>Advanced Search</Button>
                </Card.Header>
                <Collapse in={props.data.searchCollapse}>
                    <Card.Body>
                        <Form>
                            <Row>
                                <Col lg="3" md="4" xs="12">
                                    <Form.Group>
                                        <Form.Label htmlFor="transactionDateFrom">Date From</Form.Label>
                                        <DatePicker selectsStart startDate={props.data.transactionDateFrom} endDate={props.data.transactionDateTo} selected={props.data.transactionDateFrom} maxDate={props.data.transactionDateTo} dateFormat="yyyy-MM-dd" placeholderText="yyyy-mm-dd" onChange={(date) => { props.handleDatePickerChange(date, 'transactionDateFrom') }} customInput={<CustomCalendarInput />} />
                                    </Form.Group>
                                </Col>
                                <Col lg="3" md="4" xs="12">
                                    <Form.Group>
                                        <Form.Label htmlFor="transactionDateTo">Date To</Form.Label>
                                        <DatePicker selectsEnd startDate={props.data.transactionDateFrom} endDate={props.data.transactionDateTo} selected={props.data.transactionDateTo} minDate={props.data.transactionDateFrom} dateFormat="yyyy-MM-dd" placeholderText="yyyy-mm-dd" onChange={(date) => { props.handleDatePickerChange(date, 'transactionDateTo') }} customInput={<CustomCalendarInput />} />
                                    </Form.Group>
                                </Col>
                                <Col lg="3" md="4" xs="12">
                                    <Form.Group>
                                        <Form.Label>Currency</Form.Label>
                                        <Select
                                            value={props.data.selectedCurrency}
                                            onChange={props.handleDropdownChange('selectedCurrency')}
                                            options={props.data.currencies}
                                            getOptionLabel={(option) => {
                                                return (
                                                    <>
                                                        <span className={`align-middle mr-2 currency-flag currency-flag-${option.name.toLowerCase()}`}></span>
                                                        <span>{option.name}({currencySymbols[option.name]})</span>
                                                    </>
                                                )
                                            }}
                                            getOptionValue={(option) => option.name}
                                            isClearable={true}
                                            placeholder="All"
                                            isSearchable={false}
                                            isLoading={props.data.isLoadingCurrencies}
                                            styles={customStyles}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12" xs="12" className="text-right">
                                    <Button variant="success" onClick={props.handleSearch} className="mr-3">
                                        Search
                                        </Button>
                                    <Button variant="danger" onClick={props.handleReset}>
                                        Reset
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Collapse>
            </Card>


            {/* Transactions code */}
            <Card>
                <Card.Header>
                    <FontAwesomeIcon icon={['fas', 'align-justify']} className="mr-2" /><strong>Transactions</strong>
                </Card.Header>

                <div className="d-none d-lg-block">
                    <Card.Body>
                        <Table striped bordered responsive>
                            <thead>
                                <tr>
                                    {displayTransactionsHeaders}
                                </tr>
                            </thead>
                            <tbody>
                                {renderTransactionsTableData()}
                            </tbody>
                        </Table>
                    </Card.Body>
                </div>
                <div className="d-lg-none">
                    <Card.Body className="bg-dark">
                        <Row className="justify-content-md-center">
                            <Col xs="12" md="7" >
                                {props.data.isLoadingTransactions ?
                                    <div className="text-center">
                                        <FontAwesomeIcon icon={['fas', 'spinner']} className="fa-2x fa-spin text-light" />
                                    </div>
                                    :
                                    <ListGroup variant="flush">
                                        {
                                            props.data.transactions.length ? props.data.transactions.map((transaction, index) => {
                                                const { date, formattedNote, purchaseAmount, purchaseCurrency, sellAmount } = transaction; //destructuring
                                                return (
                                                    <ListGroup.Item key={index} variant="dark" className="mt-2 mb-2">
                                                        <Row>
                                                            <Col xs="auto" className="p-0 mt-3">
                                                                <FontAwesomeIcon icon={['fas', 'sync-alt']} className="fa-lg" />
                                                            </Col>
                                                            <Col>
                                                                <div>
                                                                    <span className=""><strong>Bought {purchaseCurrency} from GBP</strong></span>
                                                                    <span className="float-right">+ {currencySymbols[purchaseCurrency]}{parseFloat(purchaseAmount).toFixed(2)}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="">{ConvertMillisecondsToDate(date)}</span>
                                                                    <span className="float-right">- {currencySymbols["GBP"]}{sellAmount}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="note">
                                                                        <div>{ReactHtmlParser(formattedNote)}</div>
                                                                    </span>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                )
                                            }) : (
                                                    <div className="text-center text-light">
                                                        No data
                                                    </div>
                                                )
                                        }
                                    </ListGroup>
                                }

                            </Col>
                        </Row>
                    </Card.Body>
                </div>
            </Card>
        </>
    );
}

export default HistoryHtml;