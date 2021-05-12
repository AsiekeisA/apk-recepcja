import React from 'react';

const ContentContext = React.createContext({
    whichContent: 'keys',
    onChange: () => {}
});

export default ContentContext;