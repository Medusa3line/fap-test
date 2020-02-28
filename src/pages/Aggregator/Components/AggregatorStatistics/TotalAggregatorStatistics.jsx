import React from 'react';
import Chart1 from "../../../../img/bar_chart_1.svg";
import Chart2 from "../../../../img/bar_chart_2.svg";
import Chart3 from "../../../../img/bar_chart_3.svg";
// import './AggregatorStatistics.styles.scss';

export default function TotalAggregatorStatistics({stats: {numOfBillPayment, numOfDeposits, numOfWithdrawal, totalAmount, totalBillPaymentAmount, totalDepositAmount, totalNumOfTransaction, totalWithdrawalAmount}}) {
    return (
        <div>
            <div id="stats-top-card">
                <h6>Total Statistics</h6>
                <h4>Amount: ₦ {totalAmount}</h4>
                <h6>Count: {totalNumOfTransaction} Counts</h6>
            </div>
            <div id="stats-card-row">
                <div id="stats-card">
                    <h6> Deposit</h6>
                    <h4 id="bold">₦ {totalDepositAmount}</h4>
                    <h6 id="first-aggregator-count" className="yellow">{numOfDeposits} Counts</h6> 
                    <img id="aggregator-count-image" alt="" src={Chart1} />
                </div>
                <div id="stats-card">
                    <h6> Withdrawal</h6>
                    <h4 id="bold">₦ {totalWithdrawalAmount}</h4>
                    <h6 id="first-aggregator-count" className="grey">{numOfWithdrawal} Counts</h6> 
                    <img id="aggregator-count-image" alt="" src={Chart3} />
                </div>
                <div id="stats-card">
                    <h6> Bill Payment</h6>
                    <h4 id="bold">₦ {totalBillPaymentAmount}</h4> 
                    <h6 id="first-aggregator-count" className="green">{numOfBillPayment} Counts</h6> 
                    <img id="aggregator-count-image" alt="" src={Chart2} />
                </div>
            </div>
        </div>
    )
}
