-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_id_fkey" FOREIGN KEY ("id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
