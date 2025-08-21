import { useState } from "react";
import type { Habit, HabitHistory } from "@/store/slices/habitsSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // import Sonner toast

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (habit: Omit<Habit, "id" | "tracks"> & { tracks?: HabitHistory[] }) => Promise<boolean>;
}

export const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<Habit["frequency"]>("DAILY");

  const handleSubmit = async () => {
    if (!name.trim()) return;
  
    try {
      const success = await onAdd({
        name: name.trim(),
        description: description.trim(),
        frequency,
        tracks: [],
      });
  
      if (success) {
        toast.success(`${name.trim()} was added successfully!`);

        setName("");
        setDescription("");
        setFrequency("DAILY");
        onClose();
      } else {
        toast.error(`Failed to add ${name.trim()}.`);
       
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
   
    }
  };
  

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
     <DialogContent className="sm:max-w-md">
  <DialogHeader>
    <DialogTitle>Add New Habit</DialogTitle>
  </DialogHeader>

  <form
    className="space-y-4 mt-2"
    onSubmit={(e) => {
      e.preventDefault(); // prevent page reload
      handleSubmit();
    }}
  >
    <Input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Habit name"
      autoFocus
    />
    <Input
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Habit description (optional)"
    />
    <select
      value={frequency}
      onChange={(e) => setFrequency(e.target.value as Habit["frequency"])}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
    >
      <option value="DAILY">Daily</option>
      <option value="WEEKLY">Weekly</option>
      <option value="MONTHLY">Monthly</option>
      <option value="YEARLY">Yearly</option>
    </select>

    <DialogFooter className="mt-4 flex gap-2">
      <Button variant="outline" type="button" onClick={onClose}>
        Cancel
      </Button>
      <Button type="submit" disabled={!name.trim()}>
        Add Habit
      </Button>
    </DialogFooter>
  </form>
</DialogContent>

    </Dialog>
  );
};
