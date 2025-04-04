import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthActions, useAuthLoading } from "@/stores/useAuthStore";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LogoutDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutDialog = ({ isOpen, setIsOpen }: LogoutDialogProps) => {
  const navigate = useNavigate();
  const isFetching = useAuthLoading();
  const { SignOutUser } = useAuthActions();
  const handleLogout = () => {
    if (isFetching) return;
    SignOutUser();
    navigate("/");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogDescription>
              This will end your current session and you will need to log in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button disabled={isFetching} type="button" onClick={handleLogout}>
              {isFetching && <Loader className="animate-spin" />}
              Sign out
            </Button>
            <Button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogoutDialog;
