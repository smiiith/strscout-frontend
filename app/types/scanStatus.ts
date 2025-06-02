export const SCAN_STATUS = {
    PENDING: "pending",
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed",
};

export const getScanStatus = (status: string) => {
    switch (status) {
        case SCAN_STATUS.PENDING:
            return "Pending";
        case SCAN_STATUS.IN_PROGRESS:
            return "In progress";
        case SCAN_STATUS.COMPLETED:
            return "Completed";
        default:
            return "Unknown scan status";
    }
}