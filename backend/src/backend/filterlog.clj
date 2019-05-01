;;;; This file is part of SKRP.
;;;;
;;;; SKRP is free software: you can redistribute it and/or modify
;;;; it under the terms of the GNU Lesser General Public License as published
;;;; by the Free Software Foundation, either version 3 of the License, or
;;;; (at your option) any later version.
;;;;
;;;; SKRP is distributed in the hope that it will be useful,
;;;; but WITHOUT ANY WARRANTY; without even the implied warranty of
;;;; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
;;;; GNU Lesser General Public License for more details.
;;;;
;;;; You should have received a copy of the GNU Lesser General Public License
;;;; along with SKRP. If not, see <https://www.gnu.org/licenses/>.

(ns backend.filterlog
  (:require [backend.database :refer [db]]
            [clojure.java.jdbc :as j]))

(defn device-filter
  [device_id queryStr]
  (if-not (= nil device_id)
    (let [basicQueryString "SELECT * FROM system_log WHERE"]
      (if-not (= queryStr basicQueryString)
        (str queryStr " AND device_id IN (" device_id ")")
        (str queryStr " device_id IN (" device_id ")")))
    queryStr))

(defn adaption-filter
  [adaption_type queryStr]
  (if-not (= nil adaption_type)
    (let [basicQueryString "SELECT * FROM system_log WHERE"]
      (if-not (= queryStr basicQueryString)
        (str queryStr " AND LOWER(adaption_type) ~ LOWER('" adaption_type "')")
        (str queryStr " LOWER(adaption_type) ~ LOWER('" adaption_type "')")))
    queryStr))

(defn description-filter
  [description queryStr]
  (if-not (= nil description)
    (let [basicQueryString "SELECT * FROM system_log WHERE"]
      (if-not (= queryStr basicQueryString)
        (str queryStr " AND LOWER(description) ~ LOWER('" description "')")
        (str queryStr " LOWER(description) ~ LOWER('" description "')")))
    queryStr))

(defn date-filter
  [date queryStr]
  (if-not (= nil date)
    (let [basicQueryString "SELECT * FROM system_log WHERE"]
      (if-not (= queryStr basicQueryString)
        (str queryStr " AND DATE(created) = '" date "'")
        (str queryStr " DATE(created) = '" date "'")))
    queryStr))

(defn date-from-to-filter
  [date_from date_to queryStr]
  (if-not (or (= nil date_from) (= nil date_to))
    (let [basicQueryString "SELECT * FROM system_log WHERE"]
      (if-not (= queryStr basicQueryString)
        (str queryStr " AND DATE(created) between '" date_from "' and '" date_to "'")
        (str queryStr " DATE(created) between '" date_from "' and '" date_to "'")))
    queryStr))

(defn get-filtered-syslog
  "Returns filtered data from the database table 'system_log' based on filter input.
  Valid filter keys are
  * device_id
  * adaption_type
  * description
  * date
  * date_from
  * date_to"
  [{:keys [device_id adaption_type description date date_from date_to]}]
  (let [queryStr "SELECT * FROM system_log WHERE"]
    (let [filterQuery (date-from-to-filter date_from date_to
                                           (date-filter date
                                                        (description-filter description
                                                                            (adaption-filter adaption_type
                                                                                             (device-filter device_id queryStr)))))]
      (j/query db [filterQuery]))))