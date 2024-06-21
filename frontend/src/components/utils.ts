export const getImageCardsStyle = (): React.CSSProperties => {
    return {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
        width: '70%',
        margin: '0 auto'
    };
};