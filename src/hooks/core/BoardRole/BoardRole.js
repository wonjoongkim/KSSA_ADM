import React, { useState, useEffect } from 'react';

function useBoardRole(props) {
    setBoardProp(location.state.board);
    setFlagProp(location.state.flag);
    setTitleProp(location.state.title);
    setFormProp(location.state.form);
}

export default useBoardRole;
