import { toast } from "react-toastify";

function giveUserFeedback({ term, updateStatus, action }) {
  if (updateStatus) {
    toast.success(
      `Successfully ${
        action === "add" ? "added" : "removed"
      } '${term}' taxonomy term.`
    );
  } else {
    toast.error(
      `Failed to ${
        action === "add" ? "add" : "remove"
      } '${term}' taxonomy term.`
    );
  }
}

export { giveUserFeedback };
