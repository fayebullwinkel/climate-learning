export const getImageCardsStyle = (): React.CSSProperties => {
    return {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
        flexWrap: 'wrap',
        width: '70%',
        margin: '0 auto'
    };
};
