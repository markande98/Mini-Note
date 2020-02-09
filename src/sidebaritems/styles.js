const styles = theme => ({
    listItem: {
      cursor: 'pointer'
    },
    textSection: {
      maxWidth: '100%'
    },  
    deleteIcon: {
      position: 'relative',
      top: -60,
      left: 200,
      '&:hover': {
        color: 'red'
      }
    }
  });
  
  export default styles;