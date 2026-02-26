'use client';

export function GiveOnlineClick() {
    const handleGiveOnlineClick = () => {
        window.open('https://allsaintslosangeles.churchcenter.com/giving', '_blank');
    };
    return (
        <button onClick={handleGiveOnlineClick}>Give Online</button>
    )
}

export function GiveTextClick() {
    const handleGiveTextClick = () => {
        window.open('sms:84321');
    }
    return (
        <button onClick={handleGiveTextClick}>Text to Give</button>
    )
}

export function GiveStocksClick() {
    const handleGiveStocksClick = () => {
        window.open('https://forms.gle/Vvrx2b7YCjebM8oAA');
    }
    return (
        <button onClick={handleGiveStocksClick}>Donate Stocks</button>
    )
}