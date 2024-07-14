import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const CryptoChart = () => {
    const [chartData, setChartData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://min-api.cryptocompare.com/data/v2/histominute', {
                    params: {
                        fsym: 'BTC',
                        tsym: 'USD',
                        limit: 60,
                        api_key: 'YOUR_API_KEY_HERE', // Replace with your CryptoCompare API key
                    },
                });
                const data = response.data.Data.Data;
                const formattedData = {
                    labels: data.map((item: any) => new Date(item.time * 1000).toLocaleTimeString()),
                    datasets: [
                        {
                            label: 'Bitcoin Price',
                            data: data.map((item: any) => item.close),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                        },
                    ],
                };
                setChartData(formattedData);
            } catch (error) {
                console.error('Error fetching the data', error);
                setError('Failed to fetch data. Please try again later.');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!chartData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Live Bitcoin Price Chart</h2>
            <Line data={chartData} />
        </div>
    );
};

export default CryptoChart;
