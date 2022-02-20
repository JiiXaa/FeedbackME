import React from 'react';
import { useParams } from 'react-router-dom';

function Thanks() {
  const { choice } = useParams();
  console.log(choice);
  return <div>{choice === 'no' ? <div>NO</div> : <div>YES</div>}</div>;
}

export default Thanks;
