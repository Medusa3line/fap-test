import React from 'react';
import Chart1 from "../../../../img/bar_chart_1.svg";
import Chart2 from "../../../../img/bar_chart_2.svg";
import Chart3 from "../../../../img/bar_chart_3.svg";
import './AggregatorStatistics.styles.scss';

export default function AggregatorStatistics({stats: {depositCount, withDrawalsCount, billPaymentsCount, deposits, withDrawals, billPayments, totalCount, totals}}) {
    return (
        <div>
            <div id="stats-top-card">
                <h6>Today's Statistics</h6>
                <h4>Amount: ₦ {totals}</h4>
                <h6>Count: {totalCount} Counts</h6>
            </div>
            <div id="stats-card-row">
                <div id="stats-card">
                    <h6> Deposit</h6>
                    <h4 id="bold">₦ {deposits}</h4>
                    <h6 id="first-aggregator-count" className="yellow">{depositCount} Counts</h6> 
                    <img id="aggregator-count-image" alt="" src={Chart1} />
                </div>
                <div id="stats-card">
                    <h6> Withdrawal</h6>
                    <h4 id="bold">₦ {withDrawals}</h4>
                    <h6 id="first-aggregator-count" className="grey">{withDrawalsCount} Counts</h6> 
                    <img id="aggregator-count-image" alt="" src={Chart3} />
                </div>
                <div id="stats-card">
                    <h6> Bill Payment</h6>
                    <h4 id="bold">₦ {billPayments}</h4> 
                    <h6 id="first-aggregator-count" className="green">{billPaymentsCount} Counts</h6> 
                    <img id="aggregator-count-image" alt="" src={Chart2} />
                </div>
            </div>
        </div>
    )
}
