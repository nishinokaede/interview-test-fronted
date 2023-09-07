export default function Tag({text, color}) {
  const tagStyle = {
    backgroundColor: color,
    color: 'black',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #cccccc',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'inline-block',
    marginLeft: '5px',
    marginRight: '5px'
  };

  return (
    <div style={tagStyle}>
      {text}
    </div>
  );
}


