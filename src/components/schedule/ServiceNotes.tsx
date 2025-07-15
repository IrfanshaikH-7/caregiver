// src/components/schedule/ServiceNotes.tsx
import React from "react";

interface ServiceNotesProps {
  notes: string | null;
}

const ServiceNotes: React.FC<ServiceNotesProps> = ({ notes }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Service Notes</h3>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        {notes ? (
          <p className="text-gray-700 whitespace-pre-wrap">{notes}</p>
        ) : (
          <p className="text-gray-500 italic">No notes were added.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceNotes;
