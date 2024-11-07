/* eslint-disable react/display-name */
import { UniqueIdentifier } from "@dnd-kit/core";
import React, { forwardRef } from "react";

export const Item = forwardRef<HTMLDivElement, { id: UniqueIdentifier }>(
  ({ id, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className="shadow-xl bg-white p-4 rounded-sm">
        {id}
      </div>
    );
  }
);
