import React from 'react';

const Image = ({ src, alt }) => (
    <img
        src={src}
        alt={alt}
        className="w-full h-[400px] rounded-lg "
    />
);

export default Image;
