import React, { useEffect, useState } from 'react';

export default function PieChart(props) {
    let prevDeg = 0
    let [selectedCategory, setSelectedCategory] = useState(100);
    useEffect(() => {
        setSelectedCategory(props.data.data[0] ? props.data.data[0].total_amount_percent.toFixed(1) : 100)
    }, [props.data.data])

    return (
        <div className="pieContainer">
            <div className="pieBackground">
                {/* <div> */}
                    <div id="selected-category">
                        {selectedCategory}%
                    {/* </div> */}
                </div>
                {
                    props.data.data.map((item, index) => {
                        let currentDeg = (360 * item.total_amount_percent) / 100;
                        prevDeg = prevDeg + currentDeg;
                        if (currentDeg < 180) {
                            return (
                                <div
                                    onClick={() => setSelectedCategory(item.total_amount_percent.toFixed(1))}
                                    className="hold"
                                    style={{ transform: `rotate(${prevDeg - currentDeg}deg)` }}
                                    key={item.id}
                                >
                                    <div className="pie" style={{ backgroundColor: `${item.category_color}`, transform: `rotate(${currentDeg}deg)` }}></div>
                                </div>
                            )
                        } else {
                            return (
                                <div
                                    onClick={() => setSelectedCategory(item.total_amount_percent.toFixed(1))}
                                    key={item.id}
                                >
                                    <div className="hold" style={{ transform: `rotate(${prevDeg - currentDeg}deg)` }} >
                                        <div className="pie" style={{ backgroundColor: `${item.category_color}`, transform: `rotate(${180}deg)` }}></div>
                                    </div>
                                    <div className="hold" style={{ transform: `rotate(${(prevDeg - currentDeg) + 180}deg)` }} >
                                        <div className="pie" style={{ backgroundColor: `${item.category_color}`, transform: `rotate(${currentDeg - 180}deg)` }}></div>
                                    </div>
                                </div>
                            )
                        }

                    })
                }
            </div>
            <div className="chart-legend">
                {
                    props.data.data.map((item, index) => {
                        return (
                            <div className="chart-legend-item" key={`legend-${index}`} onClick={() => setSelectedCategory(item.total_amount_percent.toFixed(1))} >
                                <div
                                    key={`legend-identifier-${index}`}
                                    className="chart-legend-identifier"
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '5px',
                                        backgroundColor: `${item.category_color}`,
                                        position: 'absolute',
                                        left: '-20px',
                                        top: '5px'
                                    }}
                                >
                                </div>
                                {item.category_name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
