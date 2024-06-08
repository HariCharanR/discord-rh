"use client";
import { useEffect, useState } from "react";
import FileUpload from "@/components/file-upload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from 'axios'
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import qs from "query-string"
const formSchama = z.object({

  fileUrl: z.string().min(1, {
    message: "Attachment is required.",
  }),
});

const MessageFileModal = () => {

  const {isOpen , onClose , type , data} = useModal();
  const router = useRouter();
  const {apiUrl , query} = data;

  const isModalOpen = isOpen && type === "messageFile"

  const form = useForm({
    resolver: zodResolver(formSchama),
    defaultValues: {
      fileUrl: "",
    },
  });

  const handleClose = () => {
    form.reset();
    router.refresh();
    window.location.reload();
  }

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchama>) => {
    
    try{
        const url = qs.stringifyUrl({
          url:apiUrl || "",
          query,
        });

        await axios.post(url , {...values , content : values.fileUrl});
        form.reset();
        router.refresh();
        onClose();
    }catch(err){
      console.log(err)
    }
  };
 
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add an attachment
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-500">
            Send a file as a Message
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload endpoint='messageFile' value={field.value} onChange={field.onChange}/>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
             
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="discord" disabled={isLoading}>
                Send{" "}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;
