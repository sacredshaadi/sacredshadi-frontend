import React from "react";
import { AddDialog } from "../_components/vendor-route-wrapper/add-modal";
import { AddServiceModal } from "./add-service-modal";

const AddServiceNav = () => {
  return (
    <nav className="mb-6 flex items-center justify-between">
      <AddServiceModal />
    </nav>
  );
};

export default AddServiceNav;
